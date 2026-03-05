import React from "react";

const UserSettings: React.FC = () => {
  return (
    <div
      style={{ boxShadow: "0 6px 18px 0 rgba(2, 6, 23, 0.10)" }}
      className="rounded-xl bg-white flex flex-col justify-center items-center py-6 px-20"
    >
      <div className="flex gap-3">
        <ul className="flex flex-col gap-6">
          <li className="profile-list-item">Preferred Currency:</li>
          <li className="profile-list-item">Language:</li>
          <li className="profile-list-item">Monthly Start Date:</li>
          <li className="profile-list-item">Notifications Preferences:</li>
        </ul>
        <ul className="flex flex-col gap-6">
          <li className="text-[12px] text-dark-blue font-medium">INR (₹)</li>
          <li className="text-[12px] text-dark-blue font-medium">
            English (EN)
          </li>
          <li className="text-[12px] text-dark-blue font-medium">
            1st of every month
          </li>
          <ul className="mt-6 flex flex-col gap-3">
            <li className="profile-list-item">Budget Limit Alerts</li>
            <li className="profile-list-item">Goal Reminders</li>
            <li className="profile-list-item">Weekly Summary Emails</li>
          </ul>
        </ul>
      </div>
      <div className="flex justify-center items-center gap-3 mt-6">
        <button className="green-btn px-5! py-2.5!">Export Data</button>
        <button className="btn-anim rounded-lg bg-[#EF4444] px-5 py-2.5 font-medium text-white">
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
