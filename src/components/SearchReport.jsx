import { Button, Col, Grid } from '@tremor/react'
import React, { useState } from 'react'

export function SearchReport({ onSearch }) {
    const [search, setSearch] = useState("")
    return (
        <Grid numCols={3} className='flex justify-center mx-3'>
            <Col numColSpan={2} className='flex-grow mx-1'>
                <input onKeyDown={(e) => e.key === 'Enter' ? onSearch(search) : null} name='search' value={search} onChange={(e) => setSearch(e.target.value)} className='w-full h-10 px-2 border border-green-500 rounded-md text-blue-500' type="text" placeholder='Buscar por usuario, post o comentario...' />
            </Col>
            <Col className='mx-1'>
                <Button onClick={() => onSearch(search)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                </Button>
            </Col>
        </Grid>
    )
}
