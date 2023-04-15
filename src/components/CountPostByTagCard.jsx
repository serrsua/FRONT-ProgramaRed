import { Card, ProgressBar, Title } from '@tremor/react'
import React from 'react'
import { InputTag } from './InputTag'

export function CountPostByTagCard({ countPosts, onSearch, tag }) {
    return (
        <Card className='text-center'>
            <Title>Posts {tag ? `con tag ${tag}` : 'totales'}</Title>
            <ProgressBar percentageValue={countPosts} label={`${countPosts} ${tag ? `posts de ${tag}` : 'posts totales'}`} />
            <InputTag onSearch={onSearch} />
        </Card>
    )
}
