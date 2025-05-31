type PaginationResult = {
  currentPage: number;
  totalPage: number;
  totalData: number;
  limit: number;
  paginatedData: any[];
};

export const PeginationBackupUtils = ({
  data,
  page = 1,
  limit = 10,
}: {
  data: any[];
  page?: number;
  limit?: number;
}): PaginationResult => {
  const totalData = data.length;
  const totalPage = Math.ceil(totalData / limit);

  // Hitung index awal dan akhir untuk slicing
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    currentPage: page,
    totalPage,
    totalData,
    limit,
    paginatedData,
  };
};
