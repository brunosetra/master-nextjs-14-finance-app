import PageHeader from "../components/page-header";
import Trend from "../components/trend";

export default function Page() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Playground</h1>
      <div>
        <h2 className="mb-4 text-lg font-mono">PageHeader</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div>
          <PageHeader />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="flex space-x-8">
          <Trend type="Income" amount={1000} />
          <Trend type="Expense" amount={2000} />
          <Trend type="Investiment" amount={3400} />
          <Trend type="Saving" amount={741} />
        </div>
      </div>
    </main>
  );
}
