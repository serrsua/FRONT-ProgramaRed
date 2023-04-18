import { BarChart, Card, Col, DonutChart, Grid, LineChart, Title } from '@tremor/react'
import React from 'react'

export function ReportsGraph({ reportedUsers, reportedPosts, reportedComments }) {
    return (
        <div className='gap-2 my-2 mx-3'>
            <div className='w-5/6 m-auto'>
                <Card>
                    <Title>Cantidad de usuarios reportados</Title>
                    <LineChart
                        className="mt-6"
                        data={reportedUsers}
                        index="username"
                        categories={["cantidad"]}
                        colors={["blue"]}
                        yAxisWidth={40}
                    />
                </Card>
            </div>
            <Grid numCols={1} numColsSm={1} numColsMd={2} className='gap-3 my-3'>
                <Col className='mx-3'>
                    <Card className='w-full'>
                        <Title>Cantidad de comentarios reportados</Title>
                        <BarChart
                            className="mt-6"
                            data={reportedComments}
                            index="comment"
                            categories={["cantidad"]}
                            colors={["blue"]}
                            yAxisWidth={48}
                        />
                    </Card>
                </Col>
                <Col className='mx-3'>
                    <Card className='w-full'>
                        <Title>Cantidad de posteos reportados</Title>
                        <DonutChart
                            className="mt-6"
                            data={reportedPosts}
                            category="cantidad"
                            index="post"
                            variant='pie'
                            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                        />
                    </Card>

                </Col>
            </Grid>
        </div>
    )
}
