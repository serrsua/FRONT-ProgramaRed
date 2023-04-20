import { Badge, BadgeDelta, Button, Card, Col, Grid, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react'
import React, { useState } from 'react'
import { SelectUsers } from './SelectUsers'
import { SelectUsersBan } from './SelectUsersBan'
import { Pagination } from './Pagination';

export function UsersTable({ users, onSearch, onSearchBan, onDeleteUser, onUbanUser }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const currentData = users?.slice(currentPage, currentPage + itemsPerPage);

    // Change page
    const paginateFront = () => {
        if (currentPage + itemsPerPage < users?.length) {
            setCurrentPage((currentPage) => currentPage + itemsPerPage);
        }
    }

    const paginateBack = () => {
        if (currentPage > 0) {
            setCurrentPage((currentPage) => currentPage - itemsPerPage);
        }
    }
    return (
        <Card className='gap-2 m-auto w-5/6 my-3'>
            <Grid numCols={2} numColsMd={1} className='flex items-start justify-start gap-3'>
                <Col>
                    <SelectUsers onSearch={(search) => {
                        setCurrentPage(0)
                        onSearch(search)
                    }} />
                </Col>
                <Col>
                    <SelectUsersBan onSearch={(search) => {
                        setCurrentPage(0)
                        onSearchBan(search)
                    }} />
                </Col>
                <Col>
                    <Button color='blue' onClick={() => onSearch()}>Borrar filtros</Button>
                </Col>
            </Grid>
            <Table className='mx-auto'>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Premium</TableHeaderCell>
                        <TableHeaderCell>Estado</TableHeaderCell>
                        <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentData && currentData?.length > 0 ? currentData.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>{u.username}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.isPremium ? 'SI' : 'NO'}</TableCell>
                                <TableCell>
                                    {
                                        u.isActive
                                            ? <BadgeDelta>Activo</BadgeDelta>
                                            : <Badge color='red'>Inactivo</Badge>
                                    }
                                </TableCell>
                                <TableCell>
                                    <Grid numCols={1} numColsMd={1}>
                                        <Col className='mt-1'>
                                            <Button onClick={() => u.isActive
                                                ? onDeleteUser(u.id, u.username, u.email)
                                                : onUbanUser(u.id, u.username, u.email)} size='xs' color={u.isActive ? 'red' : 'emerald'}>
                                                {
                                                    u.isActive
                                                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" />
                                                        </svg>

                                                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                        </svg>
                                                }
                                            </Button>
                                        </Col>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <div>
                                <Text className='text-2xl' color='blue'>
                                    No hay datos de usuarios
                                </Text>
                            </div>
                        )
                    }
                </TableBody>
            </Table>
            <Pagination
                paginateBack={paginateBack}
                paginateFront={paginateFront} />
        </Card>
    )
}
