import data from "../../data/data.json";
import React, {useEffect} from "react";
import {useService} from "react-service-locator";
import {StateService} from "../../services/state-service";
import {BookingService} from "../../services/booking-service";


const PersonalDetailsForm = (params: any) => {

    useEffect(()=>{
    },[])

    const stateService = useService(StateService);
    const bookingService = useService(BookingService);

    return (<div className="col-md text-light">
        <div className="title-bar-bg">
            <h5 className="p-2 text-center main-titles">Personal Details</h5>
        </div>
        <div className="px-5 pb-4 pt-5 booking-form">
            <div className="mb-3">
                <label htmlFor="name" className="mb-3 form-sub-title">
                    Your Name:
                </label>
                <input type="text" required={true} className="form-control" id="name"
                       placeholder="Enter your name" onChange={(e)=>{
                    bookingService.personalDetails.setName(e.target.value);
                }}/>
                <label htmlFor="last-name" className="mb-3 form-sub-title">
                    Phone:
                </label>
                <input type="text" required={true} className="form-control" id="phone" onChange={(e)=>{
                    bookingService.personalDetails.setPhone(e.target.value);
                }}/>
                <label htmlFor="email" className="mb-3 form-sub-title">
                    Email:
                </label>
                <input type="email" required={true} className="form-control" id="email"
                       placeholder="Your Email Address" onChange={(e)=>{
                    bookingService.personalDetails.setEmail(e.target.value);
                }}/>
                <div className="py-3 mb-3 form-sub-title">
                    Number of Passengers
                </div>
                <div className="row g-4 mb-3 form-sub-title">
                    <div className="col-md">
                        Adults
                    </div>
                    <div className="col-md">
                        <select className="form-select" required={true} defaultValue={bookingService.personalDetails.getAdultCount()} aria-label="Default select example"
                                onChange={async (e) => {
                                    bookingService.personalDetails.setAdultCount(parseInt(e.target.value));
                                    // await fetchPrice();
                                }}>
                            {data.adultCounts.map((item, key) => {
                                return (<option value={item} key={item}>{item}</option>)
                            })}
                        </select>
                    </div>
                    <div className="col-md">
                        Kids
                    </div>
                    <div className="col-md">
                        <select className="form-select" required={true} defaultValue={bookingService.personalDetails.getChildCount()} aria-label="Default select example"
                                onChange={async (e) => {
                                    bookingService.personalDetails.setChildCount(parseInt(e.target.value));
                                    // await fetchPrice();
                                }}>
                            {data.kidCounts.map((item, key) => {
                                return (<option value={item} key={item}>{item}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="mb-3 py-3 mb-3 form-sub-title">
                    <label htmlFor="additionalNote" className="form-label"> Additional
                        Notes:</label>
                    <textarea className="form-control" id="additionalNote" rows={3}
                              defaultValue={""} onChange={(e)=>{
                        bookingService.personalDetails.setComment(e.target.value);
                    }}/>
                </div>
            </div>
        </div>
    </div>);
}

export default PersonalDetailsForm;

