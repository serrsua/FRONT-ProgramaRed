import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import React from 'react'
import { SearchReport } from './SearchReport';
import { Link } from 'react-router-dom';

export function ReportsTable({ reports, onSearch }) {
    return (
        <Card className='gap-2 m-auto w-5/6'>
            <SearchReport onSearch={onSearch} />
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
                        reports && reports.map(r => (
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
        </Card>
    )
}
