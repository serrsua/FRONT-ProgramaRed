import { Card, ProgressBar, Title } from '@tremor/react'
import React from 'react'
import { SelectUsers } from './SelectUsers'

export function CounUsersCard({ countUsers, onSearch }) {
    return (
        <Card className='text-center w-full'>
            <Title>Usuarios del sitio</Title>
            <ProgressBar percentageValue={countUsers} label={`${countUsers} usuarios`} />
            <SelectUsers onSearch={onSearch} />
        </Card>
    )
}
