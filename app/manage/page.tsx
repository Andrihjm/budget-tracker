"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/lib/types";

const page = () => {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="font-bold text-3xl">Manage</p>
            <p className="text-muted-foreground">
              Manage your account settings and categories
            </p>
          </div>
        </div>
      </div>
      {/* ---------- END HEADER ---------- */}

      <div className="container flex flex-col items-center gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>

        {/* <CategotyList type="income" />
        <CategotyList type="expense" /> */}
      </div>
    </>
  );
};

export default page;

export async function CategotyList({ type }: { type: TransactionType }) {}
