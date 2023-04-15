import { Button, Col, Grid } from '@tremor/react'
import React, { useState } from 'react'

export function SelectUsers({ onSearch }) {
    const [isPremium, setIsPremium] = useState(true)
    return (
        <Grid numCols={3} className='gap-2'>
            <Col numColSpan={2} className='flex flex-grow'>
                <select name='isPremium'
                    value={isPremium}
                    onChange={(e) => setIsPremium(e.target.value)}>
                    <option value={true}>Premium</option>
                    <option value={false}>No Premium</option>
                </select>
            </Col>
            <Button size='xs' className='w-fit' color='emerald' onClick={() => onSearch(isPremium)}>
                <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 8.5L10.5 10.5M7 9.5C5.61929 9.5 4.5 8.38071 4.5 7C4.5 5.61929 5.61929 4.5 7 4.5C8.38071 4.5 9.5 5.61929 9.5 7C9.5 8.38071 8.38071 9.5 7 9.5Z" stroke="black" /></svg>
            </Button>
        </Grid>
    )
}
