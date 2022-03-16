import Client from "../db/database";

export type Book = {
    id : Number,
    title : string,
    author: string,
    total_pages: Number,
    type: string,
    summary: string
}

export class BookStore {
   async index() : Promise<Book[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM books';
            const result = await connection.query(sql);
            connection.release();
            
            return result.rows;

        } catch (error) {
            throw new Error(`Cannot get books ${error}`);
        }
    }
    async create(book:Book) : Promise<Book> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5))';
    
            const newBook = await conn.query(sql, [book.title, book.author, book.total_pages, book.type, book.summary]);
            conn.release();
    
            return newBook.rows[0];
    
        } catch (error) {
          throw new Error(`Cannot get book ${error}`);
        }
    }
  async show(id:string) : Promise<Book>  {
      try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM books WHERE id=($1)'
          const result = await conn.query(sql, [id]);
          conn.release();

          return result.rows[0];

      } catch (error) {
        throw new Error(`Cannot get book ${error}`);
      }
  }
   

async delete(id:string) : Promise<Book>  {
    try {
        const conn = await Client.connect();
        const sql = 'DELETE * FROM books WHERE id=($1)'
        const result = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];

    } catch (error) {
      throw new Error(`Cannot get book ${error}`);
    }
}

// async update(id:string, book : Book) : Promise<Book>  {
//     try {
//         const conn = await Client.connect();
//         const sql = 'UPDATE * FROM books WHERE id=($1)'
//         const result = await conn.query(sql, [id]);
//         conn.release();

//         return result.rows[0];

//     } catch (error) {
//       throw new Error(`Cannot get book ${error}`);
//     }
// }


}

