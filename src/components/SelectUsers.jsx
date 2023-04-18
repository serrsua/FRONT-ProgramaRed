import { Button, Col, Grid } from '@tremor/react'
import React, { useState } from 'react'

export function SelectUsers({ onSearch }) {
    const [isPremium, setIsPremium] = useState(true)
    return (
        <Grid numCols={3} className='mx-2'>
            <Col numColSpan={2} className='flex flex-grow'>
                <select
                    className='w-full'
                    name='isPremium'
                    value={isPremium}
                    onChange={(e) => setIsPremium(e.target.value)}>
                    <option value={true}>Premium</option>
                    <option value={false}>No Premium</option>
                </select>
            </Col>
            <Col className='mx-2'>
                <Button size='xs' className='w-full' color='emerald' onClick={() => onSearch(isPremium)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                </Button>
            </Col>
        </Grid>
    )
}
