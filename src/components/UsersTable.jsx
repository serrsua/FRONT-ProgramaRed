import { Badge, BadgeDelta, Button, Card, Col, Grid, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SelectUsers } from './SelectUsers'

export function UsersTable({ users, onSearch }) {
    return (
        <Card className='mt-3'>
            <SelectUsers onSearch={onSearch} />
            <Table>
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
                        users && users?.length > 0 ? users.map(u => (
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
                                    <Grid numCols={1} numColsMd={2}>
                                        <Col className='mt-1'>
                                            <Link to={`/admin/editUser/${u.id}`}>
                                                <Button size='sm' color='blue'>
                                                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z" /><path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" /></svg>
                                                </Button>
                                            </Link>
                                        </Col>
                                        <Col className='mt-1'>
                                            <Link to={`/admin/deleteUser/${u.id}`}>
                                                <Button size='sm' color='red'>
                                                    <svg width={'24'} height={'24'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none" /><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" /></g></svg>
                                                </Button>
                                            </Link>
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
        </Card>
    )
}
