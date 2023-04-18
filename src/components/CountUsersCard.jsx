import { Card, ProgressBar, Subtitle, Title } from '@tremor/react'
import React from 'react'
import { SelectUsers } from './SelectUsers'

export function CountUsersCard({ countUsers, onSearch }) {
    return (
        <Card className='w-full'>
            <Title>Usuarios del sitio</Title>
            <Subtitle>{`${countUsers} usuarios`}</Subtitle>
            <ProgressBar percentageValue={countUsers} />
            <SelectUsers onSearch={onSearch} />
        </Card>
    )
}
