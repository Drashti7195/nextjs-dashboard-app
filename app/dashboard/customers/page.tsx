import { fetchFilteredCustomers } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Customer',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
 
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { totalPages, customers } = await fetchFilteredCustomers(query, currentPage);
  return (
    <div className="w-full">

       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
  }