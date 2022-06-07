import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { AlertItem } from "../../store/slices/AlertSlice";
import { RootState } from "../../store/store";

const Alert = () => {
  const alerts = useAppSelector((state: RootState) => state.alert.value);

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert: AlertItem) => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    });
  }
};

export default Alert;
