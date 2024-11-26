import { Search } from "@/components/search/search";
import { pageLimit } from "@/lib/utils";

interface IProps {
  params: { search: string };
  searchParams: any;
}
export default function SearchPage({
  params: { search },
  searchParams,
}: IProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || pageLimit;

  return (
    <Search
      page={page}
      limit={limit}
      searchParams={decodeURIComponent(search)}
    />
  );
}

export async function generateMetadata({ params }: IProps) {
  return {
    title: `${decodeURIComponent(params.search)}`,
  };
}
