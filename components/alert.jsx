import { Check } from "lucide-react";

export default function Alert({ title, icon, children }) {
  return (
    <div className="p-2 rounded-md border border-gray-200 dark:border-gray-800 flex space-x-2">
      <div className="flex-shrink-0">{icon}</div>
      <div className="space-y-1">
        <h5>{title}</h5>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

export function AlertSuccess({ children }) {
  return (
    <Alert
      title={
        <span className="text-green-700 dark:text-green-300">Success</span>
      }
      icon={<Check className="w-6 h-6 text-green-700 dark:text-green-300" />}
    >
      <span className="text-green-700 dark:text-green-300">{children}</span>
    </Alert>
  );
}

export function AlertError({ children }) {
  return (
    <Alert
      title={<span className="text-red-700 dark:text-red-300">Error</span>}
      icon={<Check className="w-6 h-6 text-red-700 dark:text-red-300" />}
    >
      <span className="text-red-700 dark:text-red-300">{children}</span>
    </Alert>
  );
}
