import React from 'react'
import { Card, DonutChart, Title } from "@tremor/react";

export const CommonTagsGraph = ({ data }) => {
    return (
        <Card className='mt-3'>
            <Title>Tags mas usados</Title>
            <DonutChart
                data={data.map(d => ({ tag: d.tag, cantidad: Number(d.cantidad) }))}
                category='cantidad'
                variant='pie'
                index='tag'
                colors={data.map(d => d.cantidad >= 1 && d.cantidad <= 3 ? 'indigo'
                    : d.cantidad >= 4 && d.cantidad <= 6 ? 'blue'
                        : d.cantidad >= 7 && d.cantidad <= 10 ? 'red' : 'yellow')} />
        </Card>
    )
}