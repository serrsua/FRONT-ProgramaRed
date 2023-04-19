import React from 'react'
import { BarChart, Card, Title } from "@tremor/react";

export const CommonTagsGraph = ({ data }) => {
    return (
        <Card className='w-full'>
            <Title>Tags mas usados</Title>
            <BarChart
                categories={["Cantidad de posts por tag"]}
                data={data.map(d => ({ tag: d.tag, "Cantidad de posts por tag": Number(d.cantidad) }))}
                colors={["green"]}
                category='Cantidad de posts por tag'
                index='tag'
                yAxisWidth={48}
            />
        </Card>
    )
}