import { deleteTransaction } from "@/lib/actions";
import Button from "./button";
import { Loader, TriangleAlert, X } from "lucide-react";
import { useState } from "react";

export default function TransactionItemRemoveButton({ id, onRemoved }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved(id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="xs"
      variant={confirmed ? "danger" : "ghost"}
      onClick={handleClick}
      disabled={loading}
    >
      {loading && <Loader className="w-4 h-4 animate-spin" />}

      {!loading &&
        (confirmed ? (
          <TriangleAlert className="w-4 h-4" />
        ) : (
          <X className="w-4 h-4" />
        ))}
    </Button>
  );
}
