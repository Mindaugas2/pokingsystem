import React from 'react'
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const navigate = useNavigate();
    const onSubmit = data => AuthService.register(data.firstName, data.lastName, data.city, data.email, data.password)
        .then(() => navigate("/register-success"));

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className='mb-2'>First name</label>
                        <input {...register("firstName", { required: true })} className="form-control" />
                        {errors?.firstName?.type === "required" && <p>This field is required</p>}
                    </div>
                    <div className="form-group">
                        <label className='mb-2'>Last name</label>
                        <input {...register("lastName", { required: true })} className="form-control" />
                        {errors?.lastName?.type === "required" && <p>This field is required</p>}
                    </div>
                    <div className="form-group">
                        <label className='mb-2'>City</label>
                        <input {...register("city", { required: true })} className="form-control" />
                        {errors?.city?.type === "required" && <p>This field is required</p>}
                    </div>
                    <div className="form-group">
                        <label className='mb-2'>Email</label>
                        <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} className="form-control" />
                        {errors?.email?.type === "required" && <p>This field is required</p>}
                        {errors?.email?.type === "pattern" && <p>Must be a valid email address</p>}
                    </div>
                    <div className="form-group">
                        <label className='mb-2'>Password</label>
                        <input {...register("password", { required: true, minLength: 6, maxLength: 40 })} type="password" className='form-control' />
                        {errors?.password?.type === "required" && <p>This field is required</p>}
                        {errors?.password?.type === "minLength" && <p>Password should be between 6 and 40 characters long</p>}
                        {errors?.password?.type === "maxLength" && <p>Password should be between 6 and 40 characters long</p>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block mt-5" type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
