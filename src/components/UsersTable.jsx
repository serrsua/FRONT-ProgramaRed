import { Badge, BadgeDelta, Button, Card, Col, Grid, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SelectUsers } from './SelectUsers'

export function UsersTable({ users, onSearch, onDeleteUser, onUbanUser }) {
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
                                    <Grid numCols={1} numColsMd={1}>
                                        <Col className='mt-1'>
                                            <Button onClick={() => u.isActive
                                                ? onDeleteUser(u.id, u.username, u.email)
                                                : onUbanUser(u.id, u.username, u.email)} size='sm' color={u.isActive ? 'red' : 'emerald'}>
                                                {
                                                    u.isActive
                                                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                        </svg>

                                                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
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
        </Card>
    )
}
