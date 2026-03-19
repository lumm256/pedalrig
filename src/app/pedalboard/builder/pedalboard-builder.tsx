"use client";

import { useState, useMemo, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import pedalsData from "@/data/pedals.json";
import pedalTypesData from "@/data/pedal-types.json";
import signalChainData from "@/data/signal-chain.json";

type Pedal = (typeof pedalsData)[number];
type PedalType = (typeof pedalTypesData.types)[number];
type ChainPosition = (typeof signalChainData.order)[number];

interface BoardPedal extends Pedal {
  boardId: string;
}

const SIGNAL_ORDER = signalChainData.order.reduce<Record<string, number>>(
  (acc, item) => {
    acc[item.type] = item.position;
    return acc;
  },
  {}
);

function getTypeInfo(typeId: string): PedalType | undefined {
  return pedalTypesData.types.find((t) => t.id === typeId);
}

function TypeImg({ icon, size = 20 }: { icon?: string; size?: number }) {
  if (icon && icon.startsWith("/")) {
    return <img src={icon} alt="" width={size} height={size} />;
  }
  return <span>{icon || "🎵"}</span>;
}

function getChainInfo(typeId: string): ChainPosition | undefined {
  return signalChainData.order.find((c) => c.type === typeId);
}

// ─── Sortable Chain Item ───
function SortableChainItem({
  pedal,
  onRemove,
}: {
  pedal: BoardPedal;
  onRemove: (boardId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: pedal.boardId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const chainInfo = getChainInfo(pedal.type);
  const typeInfo = getTypeInfo(pedal.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 group"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 touch-none"
        aria-label="Drag to reorder"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="3" r="1.5" />
          <circle cx="11" cy="3" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="13" r="1.5" />
          <circle cx="11" cy="13" r="1.5" />
        </svg>
      </button>
      <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg shrink-0">
        <TypeImg icon={typeInfo?.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{pedal.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {pedal.brand} · ${pedal.price} · {pedal.powerMa}mA
        </p>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
        #{chainInfo?.position || "?"}
      </span>
      <button
        onClick={() => onRemove(pedal.boardId)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all shrink-0"
        aria-label={`Remove ${pedal.name}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ─── Pedal Catalog Item ───
function CatalogItem({
  pedal,
  onAdd,
  disabled,
}: {
  pedal: Pedal;
  onAdd: (pedal: Pedal) => void;
  disabled: boolean;
}) {
  const typeInfo = getTypeInfo(pedal.type);
  return (
    <button
      onClick={() => onAdd(pedal)}
      disabled={disabled}
      className="w-full flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 text-left hover:border-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-gray-800"
    >
      <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg shrink-0">
        <TypeImg icon={typeInfo?.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{pedal.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {pedal.brand} · ${pedal.price}
        </p>
      </div>
      <span className="text-xs font-medium text-orange-500 shrink-0">+ Add</span>
    </button>
  );
}

// ─── Main Builder Component ───
export function PedalboardBuilder() {
  const [boardPedals, setBoardPedals] = useState<BoardPedal[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Filter catalog
  const filteredPedals = useMemo(() => {
    return pedalsData.filter((p) => {
      const matchType = filterType === "all" || p.type === filterType;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  // Board pedal IDs on board (by pedal id, not boardId)
  const boardPedalIds = useMemo(
    () => new Set(boardPedals.map((p) => p.id)),
    [boardPedals]
  );

  // Stats
  const totalPower = useMemo(
    () => boardPedals.reduce((sum, p) => sum + p.powerMa, 0),
    [boardPedals]
  );
  const totalPrice = useMemo(
    () => boardPedals.reduce((sum, p) => sum + p.price, 0),
    [boardPedals]
  );

  // Signal chain order check
  const chainWarnings = useMemo(() => {
    const warnings: string[] = [];
    for (let i = 0; i < boardPedals.length - 1; i++) {
      const currentPos = SIGNAL_ORDER[boardPedals[i].type] ?? 99;
      const nextPos = SIGNAL_ORDER[boardPedals[i + 1].type] ?? 99;
      if (currentPos > nextPos) {
        const currentType = getTypeInfo(boardPedals[i].type);
        const nextType = getTypeInfo(boardPedals[i + 1].type);
        warnings.push(
          `${currentType?.name || boardPedals[i].type} is usually placed before ${nextType?.name || boardPedals[i + 1].type} in the signal chain`
        );
      }
    }
    return warnings;
  }, [boardPedals]);

  // Add pedal to board
  const addPedal = useCallback((pedal: Pedal) => {
    setBoardPedals((prev) => [
      ...prev,
      { ...pedal, boardId: `${pedal.id}-${Date.now()}` },
    ]);
  }, []);

  // Remove pedal from board
  const removePedal = useCallback((boardId: string) => {
    setBoardPedals((prev) => prev.filter((p) => p.boardId !== boardId));
  }, []);

  // Auto-sort by signal chain
  const autoSort = useCallback(() => {
    setBoardPedals((prev) =>
      [...prev].sort(
        (a, b) => (SIGNAL_ORDER[a.type] ?? 99) - (SIGNAL_ORDER[b.type] ?? 99)
      )
    );
  }, []);

  // Clear board
  const clearBoard = useCallback(() => setBoardPedals([]), []);

  // Share URL
  const shareUrl = useMemo(() => {
    if (boardPedals.length === 0) return "";
    const ids = boardPedals.map((p) => p.id).join(",");
    return `${typeof window !== "undefined" ? window.location.origin : ""}/pedalboard/builder?pedals=${encodeURIComponent(ids)}`;
  }, [boardPedals]);

  // DnD handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBoardPedals((items) => {
        const oldIndex = items.findIndex((i) => i.boardId === active.id);
        const newIndex = items.findIndex((i) => i.boardId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activePedal = activeId
    ? boardPedals.find((p) => p.boardId === activeId)
    : null;

  // Unique types for filter
  const availableTypes = useMemo(() => {
    const types = new Set(pedalsData.map((p) => p.type));
    return Array.from(types).sort();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Pedal Catalog */}
      <div className="lg:col-span-1 space-y-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <h2 className="font-semibold mb-3">Pedal Catalog</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search pedals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"
          />

          {/* Type filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filterType === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
            {availableTypes.map((type) => {
              const info = getTypeInfo(type);
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterType === type
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <TypeImg icon={info?.icon} size={14} /> {info?.name || type}
                </button>
              );
            })}
          </div>

          {/* Pedal list */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {filteredPedals.map((pedal) => (
              <CatalogItem
                key={pedal.id}
                pedal={pedal}
                onAdd={addPedal}
                disabled={boardPedalIds.has(pedal.id)}
              />
            ))}
            {filteredPedals.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No pedals found</p>
            )}
          </div>
        </div>
      </div>

      {/* Right: Board + Stats */}
      <div className="lg:col-span-2 space-y-4">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-center">
            <p className="text-2xl font-bold">{boardPedals.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pedals</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-center">
            <p className="text-2xl font-bold">{totalPower}<span className="text-sm font-normal text-gray-500">mA</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Power Draw</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-center">
            <p className="text-2xl font-bold text-orange-500">${totalPrice}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Price</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={autoSort}
            disabled={boardPedals.length < 2}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ⚡ Auto-Sort Signal Chain
          </button>
          <button
            onClick={() => {
              if (shareUrl) navigator.clipboard.writeText(shareUrl);
            }}
            disabled={boardPedals.length === 0}
            className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🔗 Copy Share Link
          </button>
          <button
            onClick={clearBoard}
            disabled={boardPedals.length === 0}
            className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🗑 Clear Board
          </button>
        </div>

        {/* Chain warnings */}
        {chainWarnings.length > 0 && (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/20 p-3">
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">⚠️ Signal Chain Suggestions</p>
            <ul className="text-xs text-yellow-600 dark:text-yellow-500 space-y-0.5">
              {chainWarnings.map((w, i) => (
                <li key={i}>• {w}</li>
              ))}
            </ul>
            <button
              onClick={autoSort}
              className="mt-2 text-xs font-medium text-orange-500 hover:text-orange-400"
            >
              Fix automatically →
            </button>
          </div>
        )}

        {/* Signal Chain (sortable) */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Your Signal Chain</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              🎸 Guitar → ... → 🔊 Amp
            </span>
          </div>

          {boardPedals.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <p className="text-4xl mb-3">🎸</p>
              <p className="text-sm">Click &quot;+ Add&quot; on pedals from the catalog to start building your rig</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={boardPedals.map((p) => p.boardId)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {/* Guitar input indicator */}
                  <div className="flex items-center gap-2 px-3 py-1 text-xs text-gray-400">
                    <span>🎸</span> Guitar Input
                  </div>

                  {boardPedals.map((pedal) => (
                    <SortableChainItem
                      key={pedal.boardId}
                      pedal={pedal}
                      onRemove={removePedal}
                    />
                  ))}

                  {/* Amp output indicator */}
                  <div className="flex items-center gap-2 px-3 py-1 text-xs text-gray-400">
                    <span>🔊</span> Amp Output
                  </div>
                </div>
              </SortableContext>

              <DragOverlay>
                {activePedal ? (
                  <div className="flex items-center gap-3 rounded-lg border-2 border-orange-500 bg-white dark:bg-gray-900 p-3 shadow-lg shadow-orange-500/10">
                    <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">
                      <TypeImg icon={getTypeInfo(activePedal.type)?.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activePedal.name}</p>
                      <p className="text-xs text-gray-500">{activePedal.brand}</p>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          )}
        </div>

        {/* Shopping List */}
        {boardPedals.length > 0 && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
            <h2 className="font-semibold mb-3">🛒 Shopping List</h2>
            <div className="space-y-2">
              {boardPedals.map((pedal) => (
                <div
                  key={pedal.boardId}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {pedal.name}{" "}
                    <span className="text-gray-500 dark:text-gray-400">({pedal.brand})</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">${pedal.price}</span>
                    <a
                      href={pedal.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-500 hover:text-orange-400 font-medium"
                    >
                      Amazon →
                    </a>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-orange-500">${totalPrice}</span>
              </div>
            </div>

            {/* Power recommendation */}
            <div className="mt-4 rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
              <p className="text-sm font-medium mb-1">⚡ Power Supply Recommendation</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your rig draws {totalPower}mA.{" "}
                {totalPower <= 500
                  ? "A basic isolated power supply like the Truetone 1 Spot Pro CS7 will handle this easily."
                  : totalPower <= 1000
                    ? "You'll need a mid-range isolated supply like the Voodoo Lab Pedal Power 2 Plus."
                    : "You'll need a high-capacity supply or multiple units. Consider the Strymon Zuma."}
              </p>
              <a
                href="/power-supply"
                className="text-xs text-orange-500 hover:text-orange-400 font-medium mt-1 inline-block"
              >
                See Power Supply Guide →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
