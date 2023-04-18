import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function ReportDetail() {
    const { id } = useParams()
    console.log("Reporte id: ", id);
    const [reportDetail, setReportDetail] = useState()

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await axios.get(`/reports/${id}`)
                if (res.status === 200) {
                    setReportDetail(res.data)
                }
            })()
        }
    }, [id])
    console.log(reportDetail);
    return (
        <div className="DIV_APP flex justify-start flex-col items-start h-full overflow-hidden w-full relative">
            <h3 className='text-3xl mt-5'>Reporte de {reportDetail?.User.username}</h3>
            <span className='text-2xl mt-5'>Creado el {new Date(reportDetail?.createdAt).toLocaleString('es-AR')}</span>
            <hr className='w-full border border-green-800 my-2' />
            <p className='text-lg mt-2 mb-5'>
                {
                    reportDetail?.username
                        ? (
                            <>
                                <span className='text-2xl font-medium'>Usuario Reportado: </span>
                                <p>{reportDetail?.username}</p>
                            </>
                        )
                        : reportDetail?.Post ? (
                            <>
                                <span className='text-2xl font-medium'>Post Reportado: </span>
                                <p>{reportDetail?.Post?.title}</p>
                            </>
                        )
                            : (
                                <>
                                    <span className='text-2xl font-medium'>
                                        Comentario Reportado:
                                    </span>
                                    <p>{reportDetail?.Comment?.comment}</p>
                                </>
                            )
                }
            </p>
            <span className='text-2xl mt-5'>Detalles</span>
            <span className='text-lg'>{reportDetail?.description}</span>
            <hr className='w-full border border-green-800 my-2' />
            <Link to={'/admin'} className='bg-green-600 rounded-lg px-5 py-3 w-full text-center font-medium hover:bg-green-400 transition ease-out delay-75'>Volver</Link>
        </div>
    )
}
