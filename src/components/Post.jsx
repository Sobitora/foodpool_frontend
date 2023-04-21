import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Select from './Select'
import * as yup from 'yup'
import Input from '../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({
  stallId: yup.number().required(),
  menuName: yup.string().required(),
  location: yup.string().required(),
  description: yup.string(),
  typePost: yup.number().required(),
  limitOrder: yup.number().min(1).max(10).required(),
})
const Post = ({ onClose, user, state }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      setData(res.data)
    }

    fetchDatas()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    data.userId = user.id
    console.log(data)
    onClose()
  }

  return (
    <div className="ml-auto">
      <label className="btn btn-warning text-2xl" onClick={() => onClose()}>
        +
      </label>
      <div className={`modal backdrop-blur-sm ${state ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-5xl bg-white divide-y-2 divide-line">
          <h2 className="text-2xl font-semibold mb-5">Create Post</h2>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
              <Select
                id={'stall'}
                label={'ชื่อร้าน'}
                options={[
                  { name: 'เลือกร้านอาหาร', value: '' },
                  { name: 'API', value: '1' },
                ]}
                register={register('stallId')}
                error={errors.stallId?.message}
              />
              <Input
                id={'menuName'}
                label={'ชื่อเมนู'}
                placeholder={'ชื่อเมนู'}
                register={register('menuName')}
                error={errors.menuName?.message}
              />
              <Select
                id={'typePost'}
                label={'ประเภทคำสั่งซื้อ'}
                options={[
                  { name: 'เลือกประเภทคำสั่งซื้อ', value: '' },
                  { name: 'API', value: '1' },
                ]}
                register={register('typePost')}
                error={errors.typePost?.message}
              />
              <Input
                id={'location'}
                label={'สถานที่จัดส่ง'}
                placeholder={'สถานที่จัดส่ง'}
                register={register('location')}
                error={errors.location?.message}
              />
              <Input
                id={'limitOrder'}
                type="number"
                label={'จำนวนที่รับฝาก'}
                placeholder={'จำนวนที่รับฝาก'}
                register={register('limitOrder')}
                error={errors.limitOrder?.message}
              />
              <Input
                id={'description'}
                label={'อื่นๆ'}
                placeholder={'อื่นๆ'}
                register={register('description')}
                error={errors.description?.message}
              />
              <div className="w-full flex space-x-2 justify-end">
                <button type="submit" className="btn btn-success">
                  Post
                </button>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => onClose()}
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
