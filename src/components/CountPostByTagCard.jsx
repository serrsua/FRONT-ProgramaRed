import { Card, ProgressBar, Subtitle, Title } from '@tremor/react'
import React from 'react'
import { InputTag } from './InputTag'

export function CountPostByTagCard({ countPosts, onSearch, tag }) {
    return (
        <Card className='w-full' >
            <Title>Posts {tag ? `con tag ${tag}` : 'totales'}</Title>
            <Subtitle>{`${countPosts} ${tag ? `posts de ${tag}` : 'posts totales'}`}</Subtitle>
            <ProgressBar className='mt-2' percentageValue={countPosts} />
            <InputTag onSearch={onSearch} />
        </Card>
    )
}
