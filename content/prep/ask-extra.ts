import type { AskItem } from "./types";

/** Questions about the competitors added in the September 2026 deep-dive. Each
 *  invites a story or a view rather than a verdict on a rival, and none repeats a
 *  question in ask.ts. Every fact comes from the competitor profiles. */
export const askExtra: AskItem[] = [
  { id: "ask-milvus", competitorIds: ["milvus"],
    q: "Milvus 3.0 now indexes Lance tables in place, and Zilliz is pitching a 'Vector Lakebase'. Do you read that as validation of the format or as a competitor moving onto your ground, and does it change how you talk about Lance versus LanceDB?",
    why: "Shows you tracked the biggest competitive move of 2026. The format-versus-engine distinction is also the core of your own answer, so his framing tells you how he'd want you to tell it." },
  { id: "ask-convergence", competitorIds: ["hudi", "paimon"],
    q: "Hudi added Lance as a file format this year, and Paimon supports it too. How do you think about Lance living as a file inside other table formats, versus Lance as the whole table?",
    why: "There's a real tension between adoption and dilution here, with no scripted answer. It shows you understand the layers, and his answer tells you what the company wants to own." },
  { id: "ask-spiral", competitorIds: ["spiral", "daft"],
    q: "Spiral is building a platform on Vortex for robotics teams, and Eventual has turned Daft's company toward robot fleet data. Physical AI seems to be where the data layer race is heating up. How do you see it playing out?",
    why: "Names two rivals most candidates won't know and connects them to a market. It invites him to talk strategy rather than defend against a threat." },
  { id: "ask-partners", competitorIds: ["huggingface", "ray"],
    q: "Nvidia is buying Hugging Face and Nscale is buying Anyscale. As GPU owners buy the layers around data and compute, does that change how you think about partnerships, or about building Geneva on Ray?",
    why: "Both deals are weeks old, so this shows you're current. It also touches a real dependency without sounding alarmed, since Ray stays with the PyTorch Foundation." },
  { id: "ask-pointers", competitorIds: ["databricks-snowflake", "hyperscaler-lakehouses"],
    q: "Databricks, Snowflake and Google all have column types that point at files in object storage. In a deal against them, does 'pointers aren't bytes' land with buyers, or do you have to show it?",
    why: "Invites a story from real deals. It sets up your LanceScope point naturally: the advantage is invisible until someone shows the bytes." },
  { id: "ask-agent-memory", competitorIds: ["pinecone", "weaviate", "chroma"],
    q: "Pinecone, Weaviate and Chroma are all moving into agent memory. Is that a workload you want LanceDB to win, or a distraction from the multimodal lakehouse story?",
    why: "A focus question every startup CEO has an opinion on. His answer tells you what technical marketing would be asked to lead with, and what to leave alone." },
];
