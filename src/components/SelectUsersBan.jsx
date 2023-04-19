import { Button, Col, Grid } from '@tremor/react'
import React, { useState } from 'react'

export function SelectUsersBan({ onSearch }) {
    const [isActive, setIsActive] = useState(true)
    return (
        <Grid numCols={3} className='mx-2 flex justify-center'>
            <Col numColSpan={2} className='flex flex-grow'>
                <select
                    style={{ width: '100%' }}
                    name='isActive'
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}>
                    <option value={false}>Baneados</option>
                    <option value={true}>No Baneados</option>
                </select>
            </Col>
            <Col className='mx-2'>
                <Button size='xs' className='w-full' color='emerald' onClick={() => onSearch(isActive)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                </Button>
            </Col>
        </Grid>
    )
}
