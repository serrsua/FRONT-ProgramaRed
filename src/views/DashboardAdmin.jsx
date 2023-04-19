import React, { useEffect, useState } from 'react'
import { Grid, Col, Card, Text, Metric, TabList, Tab } from "@tremor/react";
import axios from 'axios';
import { CommonTagsGraph } from '../components/CommonTagsGraph';
import { CountUsersCard } from "../components/CountUsersCard";
import { CountPostByTagCard } from '../components/CountPostByTagCard';
import { UsersTable } from '../components/UsersTable';
import Swal from 'sweetalert2';
import { ReportsGraph } from '../components/ReportsGraph';
import { ReportsTable } from '../components/ReportsTable';

export default function DashboardAdmin() {
    const [siteUsers, setSiteUsers] = useState(0)
    const [sitePosts, setSitePosts] = useState(0)
    const [siteTags, setSiteTags] = useState([])
    const [selectedView, setSelectedView] = useState(1)
    const [users, setUsers] = useState([])
    const [countedReports, setCountedReports] = useState({
        reportedUsers: [],
        reportedPosts: [],
        reportedComments: []
    })
    const [allReports, setAllReports] = useState([])
    const [tag, setTag] = useState("")

    const countUsers = async (isPremium) => {
        let query = isPremium ? `?isPremium=${isPremium}` : ""
        const res = await axios.get(`/countUsers${query}`)
        if (res.status === 200) {
            setSiteUsers(Number(res.data))
        }
    }
    const countPostByTag = async (tag) => {
        setTag(tag)
        let query = tag ? `?tag=${tag}` : ""
        const res = await axios.get(`/countPosts${query}`)
        if (res.data) {
            setSitePosts(res.data)
        }
    }
    const commonTags = async () => {
        const res = await axios.get("/commonTags")
        if (res.data) {
            setSiteTags(res.data)
        }
    }
    const getAllUsers = async (isPremium) => {
        let query = isPremium ? `?isPremium=${isPremium}` : ""
        const res = await axios.get(`/allUsers${query}`)
        if (res.status === 200) {
            setUsers(res.data)
        }
    }
    const getActiveUsers = async (isActive) => {
        const res = await axios.get(`/getActiveUsers?isActive=${isActive}`)
        if (res.status === 200) {
            setUsers(res.data)
        }
    }
    const confirmDeleteUser = async (id, username, email) => {
        try {
            const result = await Swal.fire({
                title: "Confirmar Baneo",
                text: `Esta seguro de banear a ${username}?`,
                showCancelButton: true,
                showConfirmButton: true
            })
            if (result.isConfirmed) {
                const res = await axios.delete(`/user/${id}`)
                if (res.status === 200) {
                    const response = await axios.post('/subcriptionsEmail', {
                        username: username,
                        email: email,
                        type: "Baneo"
                    })
                    if (response.status === 200) {
                        await Swal.fire({
                            title: "Baneo confirmado",
                            text: `Usuario baneado! 😱 ${response.data}`,
                            showConfirmButton: true
                        })
                        await getAllUsers()
                    }
                }
            }
        } catch (error) {
            await Swal.fire({
                title: "Error al banear usuario",
                text: error.message,
                timer: 3000
            })
        }
    }
    const confirmUnbanUser = async (id, username, email) => {
        try {
            const result = await Swal.fire({
                title: "Confirmar desbaneo",
                text: `Esta seguro de desbanear a ${username}?`,
                showCancelButton: true,
                showConfirmButton: true
            })
            if (result.isConfirmed) {
                const res = await axios.put(`/unbanUser/${id}`)
                if (res.status === 200) {
                    const response = await axios.post('/subcriptionsEmail', {
                        username: username,
                        email: email,
                        type: "Desbaneo"
                    })
                    if (response.status === 200) {
                        await Swal.fire({
                            title: "Desbaneo confirmado",
                            text: `Usuario desbaneado! 🤗 ${response.data}`,
                            showConfirmButton: true
                        })
                        await getAllUsers()
                    }
                }
            }
        } catch (error) {
            await Swal.fire({
                title: "Error al banear usuario",
                text: error.message,
                timer: 3000
            })
        }
    }

    const countReports = async () => {
        try {
            const res = await axios.get("/reports")
            if (res.status === 200) {
                console.log(res.data);
                setCountedReports({
                    reportedUsers: res.data.reportedUsers.map(ru => ({ username: ru.username, cantidad: Number(ru.cantidad) })),
                    reportedPosts: res.data.reportedPosts.map(rp => ({ post: rp.post, cantidad: Number(rp.cantidad) })),
                    reportedComments: res.data.reportedComments.map(rc => ({ comment: rc.comentario, cantidad: Number(rc.cantidad) }))
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAllReports = async (search) => {
        try {
            let query = search ? `?search=${search}` : ""
            const res = await axios.get(`/allReports${query}`)
            if (res.status === 200) {
                setAllReports(res.data)
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        countUsers()
        countPostByTag()
        commonTags()
        getAllUsers()
        countReports()
        getAllReports()
    }, [])
    return (
        <div className='m-auto text-center'>
            <Text className='text-center text-2xl mt-3'>Dashboard admin</Text>
            <TabList defaultValue={selectedView}
                className='w-screen mt-6'
                onValueChange={value => setSelectedView(Number(value))}>
                <Tab value={1} text='Grafica Usuarios y Posts' />
                <Tab value={2} text='Detalle Usuarios' />
                <Tab value={3} text='Grafica Reportes' />
                <Tab value={4} text='Detalle Reportes' />
            </TabList>
            {
                selectedView === 1 ? (
                    <div className='gap-2 my-2 mx-3'>
                        <div className='w-5/6 m-auto'>
                            <CommonTagsGraph data={siteTags} />
                        </div>
                        <Grid numCols={1} numColsSm={1} numColsMd={2} className='gap-3 my-3' >
                            <Col className='mx-2'>
                                <CountUsersCard countUsers={siteUsers} onSearch={countUsers} />
                            </Col>
                            <Col className='mx-2'>
                                <CountPostByTagCard
                                    countPosts={sitePosts}
                                    onSearch={countPostByTag}
                                    tag={tag} />
                            </Col>
                        </Grid>
                    </div>

                ) : selectedView === 2 ? (
                    <UsersTable users={users}
                        onSearch={getAllUsers}
                        onSearchBan={getActiveUsers}
                        onDeleteUser={confirmDeleteUser}
                        onUbanUser={confirmUnbanUser} />
                ) : selectedView === 3 ? (
                    <>
                        <ReportsGraph
                            reportedUsers={countedReports.reportedUsers}
                            reportedPosts={countedReports.reportedPosts}
                            reportedComments={countedReports.reportedComments} />
                    </>
                ) : (
                    <>
                        <ReportsTable reports={allReports} onSearch={getAllReports} />
                    </>
                )
            }
        </div>
    )
}
