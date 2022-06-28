import React, {useEffect} from "react";
import '../../styles/style.scss'
import {MainNavbar} from "../banners/MainNavbar";

import {useForm} from 'react-hook-form';
import {Button} from "react-bootstrap";

export const LabPage = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        getValues,
        setValue,
        trigger,
        watch

    } = useForm({mode: "all", reValidateMode: "onChange"});
    const onSubmit = (data: any) => {
        console.log(data);
    };

    const onChangeForm = (data: any) => {
        console.log(data);
    };
    useEffect(() => {
        watch(onChangeForm)
    }, [])
    return (
        <div>
            <section className="nav-bar-main">
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="py-5 px-3">
                <div className="container text-center">
                    <form>
                        <input {...register('firstName')} />
                        <input {...register('lastName', {required: true,})} />
                        {errors.lastName && <p>Last name is required.</p>}`
                        <input type={"number"} {...register('age', {})} />
                        {errors.age && <p>Please enter number for age.</p>}
                        <input type="submit"/>
                        <Button onClick={() => reset()}>clear</Button>
                    </form>
                    <Button onClick={() => handleSubmit(onSubmit)()}>Submit</Button>

                </div>
                <button onClick={() => {
                    setValue("firstName", "hello", {
                        shouldDirty: true, shouldTouch: true
                    });
                    handleSubmit(() => {
                    })()
                }}>
                    test name
                </button>

            </section>
        </div>
    );
}
