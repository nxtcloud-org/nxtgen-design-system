import type { ReactNode } from "react";

export interface PropRow {
  name: string;
  type: ReactNode;
  defaultValue?: ReactNode;
  description?: ReactNode;
  required?: boolean;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-default">
      <table className="w-full text-sm">
        <thead className="bg-subtle text-text-tertiary text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left font-medium px-4 py-2.5">Name</th>
            <th className="text-left font-medium px-4 py-2.5">Type</th>
            <th className="text-left font-medium px-4 py-2.5">Default</th>
            <th className="text-left font-medium px-4 py-2.5">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          {rows.map((row) => (
            <tr key={row.name} className="align-top">
              <td className="px-4 py-3 font-mono text-text-primary whitespace-nowrap">
                {row.name}
                {row.required && <span className="text-text-danger ml-1">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-text-brand">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-text-tertiary">
                {row.defaultValue ?? "—"}
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {row.description ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
