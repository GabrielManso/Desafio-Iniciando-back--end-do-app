import csvParse from 'csv-parse';
import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface csv {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<void> {
    const CSVReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = CSVReadStream.pipe(parsers);

    const transactions: csv[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !value || !type) return;

      categories.push(category);

      transactions.push({ title, value, type, category });
    });
  }
}

export default ImportTransactionsService;
