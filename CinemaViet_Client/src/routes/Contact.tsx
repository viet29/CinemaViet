import { Helmet } from "react-helmet";
import conf from "../Config";

import { Fragment, useState } from "react";

function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact - {conf.SITE_NAME}</title>
      </Helmet>
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="text-red-600 pt-10 relative h-30 ">
            <div className="absolute inset-x-0 top-0 h-16  text-3xl  text-center font-bold ">
              Contact Us
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="">
              <div className="text-gray-900 pt-6  ">
                <div className="font-bold  hover:text-sky-400">HEAD OFFICE</div>
                <div>
                  Km10, Nguyen Trai street, Ha Đong district, Ha Noi
                </div>
              </div>

              <div className="text-gray-900 pt-6">
                <div className="font-bold hover:text-sky-400">CUSTOMER SERVICE</div>
                <div>
                  <div> Hotline: 6677 1508</div>
                  <div> Working hours: 8:00 - 22:00</div>
                  <div> All days excluding Public Holidays</div>
                  Email support:
                  <a href="#" className="no-underline text-red-500 hover:underline ">
                    {" "}
                    admin@cinemaviet.vn
                  </a>
                </div>
              </div>

              <div className="text-gray-900 pt-6">
                <div className="font-bold  hover:text-sky-400">ADVERTISING CONTACT</div>
                <div>
                  <div> Sales Department: +84-12-3456 78 90</div>
                  <div> Ext: Ms. Viet </div>
                  <div> Hotline: 097 519 6379</div>
                  Email:
                  <a href="#" className="no-underline text-red-500 hover:underline ">
                    admin@cinemaviet.vn
                  </a>
                </div>
              </div>

              <div className="text-gray-900 pt-6">
                <div className="font-bold  hover:text-sky-400">
                  CONTACT BRAND COMMUNICATION MARKETING COOPERATION
                </div>
                <div>
                  <div> Cinema Marketing Department: +84-98-7654 32 10</div>
                  <div> Ext: Mr. Thang</div>
                  Email:
                  <a href="#" className="no-underline text-red-500 hover:underline ">
                    {" "}
                    admin2@cinemaviet.vn
                  </a>
                </div>
              </div>
              <br></br>
            </div>

            <div>
              <div className="text-gray-900 pt-6">
                <div className="font-bold  hover:text-sky-400">
                  CONTACT TO BUY GROUP TICKETS, GIFT CARDS, ORGANIZE EVENTS, RENT THEATERS,... JOIN
                  CHAPTER EDUCATOR WITH CINEMA
                </div>
                <div>
                  <div> Sales Department:</div>

                  <div className="pt-6">
                    <p className="font-medium ">- Southern: </p>
                    <p>Tele: 097 519 6379 (Mr Viet)</p>
                    <p>
                      Email:{" "}
                      <a href="#" className="no-underline text-red-500 hover:underline ">
                        quocvietdz@cinemaviet.vn
                      </a>
                    </p>
                  </div>

                  <div className="pt-6">
                    <p className="font-medium ">- Northern: </p>
                    <p>Tele: 098 765 4321 (Mr Thinh)</p>
                    <p>
                      Email:{" "}
                      <a href="#" className="no-underline text-red-500 hover:underline ">
                        thinhga@cinemaviet.vn
                      </a>
                    </p>
                  </div>

                  <div className="pt-6">
                    <p className="font-medium ">- Central: </p>
                    <p>Tele: (Ms Quynh)</p>
                    <p>
                      Email:{" "}
                      <a href="#" className="no-underline text-red-500 hover:underline ">
                        quynh@cinemaviet.vn
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-gray-900 pt-6">
                <div className="font-bold  hover:text-sky-400">CONTACT MEDIA & SPONSORSHIP</div>
                <div>
                  <div> Media Department: +84-12-3456-7890</div>
                  Email:
                  <a href="#" className="no-underline text-red-500 hover:underline ">
                    hihi@cinemaviet.vn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Contact;
