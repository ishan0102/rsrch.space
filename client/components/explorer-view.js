export default function ExplorerView({ entries }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Explorer View</h2>
      <ul className="space-y-2">
        {entries.map((entry, index) => (
          <li key={index} className="border p-4 rounded-md">
            <a
              href={entry.url.replace(/pdf(?=.)/, "abs").replace(/v\d+$/, "")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {entry.title}
            </a>
            <p className="text-sm text-gray-500">
              {new Date(entry.notion_timestamp).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}