import { useFormatCurrency } from "@/hooks/use-format-currency";
import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";

export default function TransactionItem({ type, category, description, amount }) {
    const typesMap = {
        'Income': {
          icon: HandCoins,
          colors: 'text-green-500 dark:text-green-400'
        },
        'Expense': {
          icon: Wallet,
          colors: 'text-red-500 dark:text-red-400'
        },
        'Saving': {
          icon: PiggyBank,
          colors: 'text-indigo-500 dark:text-indigo-400'
        },
        'Investment': {
          icon: Landmark,
          colors: 'text-yellow-500 dark:text-yellow-400'
        }
      }

      const IconComponent = typesMap[type].icon
      const colors = typesMap[type].colors

    return (<div className="w-full flex items-center">
        <div className="flex items-center mr-4 grow">
            <IconComponent className={`mr-2 w-4 h-4 hidden sm:block ${colors}`}/>
            <span> {description}</span>
        </div>  
        <div className="min-w-[150px] items-center hidden md:flex">
            {category && <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-gray-700 px-2 py-0.5">{category}</div> }
        </div>
        
        <div className="min-w-[70px] text-right">{useFormatCurrency(amount)}</div>
        <div className="min-w-[50px] flex justify-end">...</div>
    </div>)
}