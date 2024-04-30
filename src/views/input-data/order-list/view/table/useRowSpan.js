export const useRowSpan = (instance) => {
    const { allColumns } = instance;
    let rowSpanHeaders = [];
  
    allColumns.forEach((column) => {
      const { id, enableRowSpan } = column;
  
      if (enableRowSpan) {
        rowSpanHeaders = [
          ...rowSpanHeaders,
          { id, topCellValue: null, topCellIndex: 0 }
        ];
      }
  
      Object.assign(instance, { rowSpanHeaders });
    });
  };
  