"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  onReorder?: (dragIndex: number, dropIndex: number) => void;
}

interface SortableFileItemProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
}

function SortableFileItem({ file, index, onRemove }: SortableFileItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `file-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between rounded-md border p-2 cursor-move"
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">{file.name}</span>
        <span className="text-xs text-muted-foreground">
          ({(file.size / 1024).toFixed(1)} KB)
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function FileList({ files, onRemove, onReorder }: FileListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (files.length === 0) {
    return null;
  }

  if (!onReorder) {
    return (
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
          const oldIndex = parseInt(active.id.toString().split("-")[1]);
          const newIndex = parseInt(over.id.toString().split("-")[1]);
          onReorder(oldIndex, newIndex);
        }
      }}
    >
      <SortableContext
        items={files.map((_, index) => `file-${index}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {files.map((file, index) => (
            <SortableFileItem
              key={`file-${index}`}
              file={file}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}