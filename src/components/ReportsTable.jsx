import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import React, { useState } from 'react'
import { SearchReport } from './SearchReport';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';

export function ReportsTable({ reports, onSearch }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const currentData = reports?.slice(currentPage, currentPage + itemsPerPage);

    // Change page
    const paginateFront = () => {
        if (currentPage + itemsPerPage < reports?.length) {
            setCurrentPage((currentPage) => currentPage + itemsPerPage);
        }
    }

    const paginateBack = () => {
        if (currentPage > 0) {
            setCurrentPage((currentPage) => currentPage - itemsPerPage);
        }
    }

    return (
        <Card className='gap-2 my-3 mx-auto w-5/6'>
            <SearchReport onSearch={(search) => {
                setCurrentPage(0)
                onSearch(search)
            }} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Reportado (Usuario, Posteo o Comentario)</TableHeaderCell>
                        <TableHeaderCell>Descripcion</TableHeaderCell>
                        <TableHeaderCell>Usuario</TableHeaderCell>
                        <TableHeaderCell>Fecha</TableHeaderCell>
                        <TableHeaderCell>Detalles</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentData && currentData?.map(r => (
                            <TableRow key={r.id}>
                                <TableCell>
                                    {
                                        r.username
                                            ? <span>{r.username}</span>
                                            : r.Post ? <span>{r.Post.title}</span>
                                                : <span>{r.Comment.comment}</span>
                                    }
                                </TableCell>
                                <TableCell>{r.description}</TableCell>
                                <TableCell>{r.User.username}</TableCell>
                                <TableCell>{new Date(r.createdAt).toLocaleString("es-AR")}</TableCell>
                                <TableCell>
                                    <Button>
                                        <Link to={`/admin/reports/${r.id}`}>
                                            Ver
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Pagination
                paginateBack={paginateBack}
                paginateFront={paginateFront} />
        </Card>
    )
}
