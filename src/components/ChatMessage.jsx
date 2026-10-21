// Render a small, safe subset of the assistant's formatting without HTML injection.
import { Link } from "react-router-dom";

function Inline({ text }) {
  return text.split(/(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\([^\s)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")) return <Link key={index} to={href}>{label}</Link>;
      if (/^https?:\/\//i.test(href)) return <a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>;
    }
    return part;
  });
}

export default function ChatMessage({ text }) {
  const blocks = [];
  let lines = [];
  let kind = null;
  const flush = () => {
    if (!lines.length) return;
    const items = lines;
    const key = blocks.length;
    if (kind === "ul" || kind === "ol") {
      const List = kind;
      blocks.push(<List key={key}>{items.map((item, index) => <li key={index}><Inline text={item}/></li>)}</List>);
    } else if (kind === "heading") blocks.push(<h3 key={key}><Inline text={items.join(" ")}/></h3>);
    else blocks.push(<p key={key}><Inline text={items.join("\n")}/></p>);
    lines = [];
  };
  for (const line of text.split("\n")) {
    if (!line.trim()) { flush(); kind = null; continue; }
    const unordered = line.match(/^\s*[-*]\s+(.+)/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)/);
    const heading = line.match(/^#{1,4}\s+(.+)/);
    const nextKind = unordered ? "ul" : ordered ? "ol" : heading ? "heading" : "paragraph";
    if (nextKind !== kind || nextKind === "heading") flush();
    kind = nextKind;
    lines.push(unordered?.[1] ?? ordered?.[1] ?? heading?.[1] ?? line);
  }
  flush();
  return <div className="chat-formatted">{blocks}</div>;
}
