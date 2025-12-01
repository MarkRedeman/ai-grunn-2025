import EggsThumbnail from "@/assets/aigrunn/geti-eggs/eggs-thumbnail.png";
import type { Edge, Node, NodeProps } from "@xyflow/react";
import { Handle, MarkerType, Position, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { memo } from "react";
import { tv } from "tailwind-variants";

const UserImage = memo(() => {
  return (
    <div className="rounded-md bg-gray-50 border-1 border-gray-400 p-4 w-[150px]">
      <img src={EggsThumbnail} width={"100%"} height={"100%"} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

const Label = memo(({ data }: NodeProps & { data: { label: string } }) => {
  return <div className="rounded-md bg-gray-50 border-1 border-gray-400 p-2 w-[150px] text-center">{data.label}</div>;
});

const SamDecoder = memo(() => {
  return (
    <>
      <div className="rounded-md bg-white text-[12px] border-1 border-[var(--xy-node-border,_var(--xy-node-border-default))] p-2 w-[150px] text-center">
        SAM Decoder
      </div>

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      <Handle id="encoder-input" type="target" position={Position.Left} />
    </>
  );
});

const groupStyles = tv({
  base: "w-full h-full border-2 ",
  variants: {
    color: {
      encoder: "border-purple-500 bg-purple-50",
      decoder: "border-emerald-500 bg-emerald-50",
    },
  },
});
const GroupBackground = memo((props: NodeProps) => {
  const styles = groupStyles({
    color: props.id.includes("encoder") ? "encoder" : "decoder",
  });

  return <div className={styles} />;
});

const nodes: Array<Node> = [
  {
    id: "encoder-group",
    type: "groupBackground",
    position: { x: 0, y: 0 },
    style: { width: 200, height: 475 },
    data: {},
  },

  {
    id: "decoder-group",
    type: "groupBackground",
    position: { x: 250, y: 100 },
    style: { width: 200, height: 375 },
    data: {},
  },

  // Input node
  {
    id: "user-image",
    parentId: "encoder-group",
    data: { label: "User Image" },
    position: { x: 25, y: 25 },
    // TOOD
    type: "userImage",
  },

  // Preprocessing
  {
    id: "encoder-title",
    parentId: "encoder-group",
    type: "customLabel",
    data: { label: "Encoder" },
    className: "font-bold text-purple-800",
    position: { x: 25, y: -25 },
  },
  {
    id: "preprocessing",
    parentId: "encoder-group",
    data: { label: "Image pre-processing" },
    position: { x: 25, y: 200 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },

  // Encoder
  {
    id: "encoder",
    parentId: "encoder-group",
    data: { label: "SAM Encoder" },
    position: { x: 25, y: 300 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },

  // Image Embeddings (key artifact)
  {
    id: "embeddings",
    parentId: "encoder-group",
    data: { label: "Image Embeddings" },
    position: { x: 25, y: 400 },
    className: "font-bold",
    targetPosition: Position.Top,
    sourcePosition: Position.Right,
  },

  // Decoder
  {
    id: "decoder-title",
    parentId: "decoder-group",
    type: "customLabel",
    data: { label: "Decoder" },
    className: "font-bold text-emerald-800",
    position: { x: 25, y: -25 },
  },
  // User Prompts
  {
    id: "user-prompts",
    parentId: "decoder-group",
    data: { label: "User Prompts" },
    position: { x: 25, y: 50 },
    type: "input",
    className: "bg-blue-100 border-2 border-blue-600",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },

  // Decoder
  {
    id: "decoder",
    parentId: "decoder-group",
    data: {
      label: "SAM Decoder",
    },
    type: "SamDecoder",
    position: { x: 25, y: 125 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },

  {
    id: "post-process",
    parentId: "decoder-group",
    data: { label: "Post-process" },
    position: { x: 25, y: 200 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },
  // Output Masks
  {
    id: "shapes",
    parentId: "decoder-group",
    data: { label: "Output Shapes" },
    position: { x: 25, y: 300 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    type: "output",
  },
];

const edges: Array<Edge> = [
  { id: "e1", source: "user-image", target: "preprocessing", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "preprocessing", target: "encoder", markerEnd: { type: MarkerType.ArrowClosed } },
  {
    id: "e3",
    source: "encoder",
    target: "embeddings",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e4",
    source: "embeddings",
    target: "decoder",
    type: "step",
    targetHandle: "encoder-input",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "var(--color-purple-500)",
    },
  },
  {
    id: "e5",
    source: "user-prompts",
    target: "decoder",

    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e6",
    source: "decoder",
    target: "post-process",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e7",
    source: "post-process",
    target: "shapes",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const nodeTypes = {
  customLabel: Label,
  userImage: UserImage,
  SamDecoder: SamDecoder,
  groupBackground: GroupBackground,
};

function SAMArchitectureDiagram({ step }: { step: number }) {
  return (
    <div className={`flex w-full w-min-0 h-full min-h-0 grow-1 ${step < 0 ? "grayscale" : ""}`}>
      <ReactFlow
        nodes={nodes.map((node) => {
          if (node.id === "decoder-group") {
            return {
              ...node,
              className: step > 1 ? "" : "grayscale",
            };
          }
          return node;
        })}
        edges={edges.filter((edge) => {
          return edge.id === "e4" ? step > 0 : true;
        })}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        nodeTypes={nodeTypes}
        preventScrolling={false}
        selectNodesOnDrag={false}
        proOptions={{ hideAttribution: true }}
      >
        {/*
      <Background />
      <Controls />
        */}
      </ReactFlow>
    </div>
  );
}

export function SegmentAnythingArchitecture({ step }: { step: number }) {
  return <SAMArchitectureDiagram step={step} />;
}
