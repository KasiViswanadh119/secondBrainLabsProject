// src/components/DataTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TableSortLabel } from '@mui/material';

const DataTable = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');

  useEffect(() => {
    fetchBooks();
  }, [page, rowsPerPage, order, orderBy]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/science_fiction.json?limit=100');
      const bookData = response.data.works.map(book => ({
        title: book.title,
        authorName: book.authors[0]?.name || 'Unknown',
        firstPublishYear: book.first_publish_year || 'N/A',
        subject: book.subject || 'N/A',
        authorBirthDate: 'N/A', // Placeholder
        authorTopWork: book.title,
        ratingsAverage: 'N/A' // Placeholder
      }));
      setBooks(bookData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedBooks = books.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['ratingsAverage', 'authorName', 'title', 'firstPublishYear', 'subject', 'authorBirthDate', 'authorTopWork'].map(column => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleRequestSort(column)}
                  >
                    {column}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.ratingsAverage}</TableCell>
                <TableCell>{book.authorName}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.firstPublishYear}</TableCell>
                <TableCell>{book.subject}</TableCell>
                <TableCell>{book.authorBirthDate}</TableCell>
                <TableCell>{book.authorTopWork}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
