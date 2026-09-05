"use client";

import DrawerSection from "./common/DrawerSection";
import InfoItem from "./common/InfoItem";
import ActivityItem from "./common/ActivityItem";
import { formatDate } from "../../../../utils/formatDate";

const EnquiryDrawer = ({
  enquiry,
  onClose,
  onEdit,
  onStatusChange,
}) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
      />

      {/* DRAWER */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-[450px]">
        
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-gray-400">
              ENQUIRY #{enquiry.id}
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              {enquiry.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xl text-gray-500"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* STATUS */}
          <DrawerSection title="Lead Status">
            <select
              value={enquiry.status}
              onChange={(e) =>
                onStatusChange(
                  enquiry.id,
                  e.target.value
                )
              }
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none"
            >
              <option value="NEW">
                New
              </option>

              <option value="CONTACTED">
                Contacted
              </option>

              <option value="QUALIFIED">
                Qualified
              </option>

              <option value="CONVERTED">
                Converted
              </option>

              <option value="LOST">
                Lost
              </option>
            </select>
          </DrawerSection>

          {/* CUSTOMER */}
          <DrawerSection title="Customer">
            <div className="space-y-4">
              <InfoItem
                label="Name"
                value={enquiry.name}
              />

              <InfoItem
                label="Phone"
                value={enquiry.phone}
              />

              <InfoItem
                label="Email"
                value={enquiry.email}
              />
            </div>
          </DrawerSection>

          {/* TRIP */}
          <DrawerSection title="Trip Details">
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 p-4">
              
              <InfoItem
                label="Destination"
                value={enquiry.destination}
              />

              <InfoItem
                label="Travel Date"
                value={formatDate(
                  enquiry.travelDate
                )}
              />

              <InfoItem
                label="Travelers"
                value={enquiry.travelers}
              />

              <InfoItem
                label="Budget"
                value={`₹${Number(
                  enquiry.budget || 0
                ).toLocaleString("en-IN")}`}
              />

            </div>
          </DrawerSection>

          {/* MESSAGE */}
          <DrawerSection title="Message">
            <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
              {enquiry.message ||
                "No message provided."}
            </div>
          </DrawerSection>

          {/* ACTIVITY */}
          <DrawerSection title="Activity">
            <ActivityItem
              title="Enquiry received"
              time={formatDate(
                enquiry.createdAt
              )}
            />
          </DrawerSection>

        </div>

        {/* FOOTER */}
        <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={() => onEdit(enquiry)}
            className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold hover:bg-gray-50"
          >
            Edit Enquiry
          </button>
        </div>

      </aside>
    </>
  );
};

export default EnquiryDrawer;