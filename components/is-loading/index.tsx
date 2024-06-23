import { cn } from "@/lib/utils";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import classes from "./styles.module.css";

function Index({
  children,
  loading,
  className,
}: {
  children?: React.ReactNode;
  loading: boolean;
  className?: string;
}) {
  // cn
  return (
    <div className={className ?? ``}>
      {loading && <LoadingComponent />}
      {children ? children : ``}
    </div>
  );
}

export default Index;

const LoadingComponent = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div className={cn(" flex justify-content-center", classes.loadingContainer)}>
        {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
        <Dialog
          //   header="Header"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            setVisible(false);
          }}
          className={`sell-account-modal`}
        >
          <div className="flex justify-center items-center mt-7 ">
            <div className={cn(classes.loader)}>
              <svg viewBox="0 0 80 80">
                <circle id="test" cx="40" cy="40" r="32"></circle>
              </svg>
            </div>

            <div className={cn(classes.loader, classes.triangle)}>
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>

            <div className={cn(classes.loader)}>
              <svg viewBox="0 0 80 80">
                <rect x="8" y="8" width="64" height="64"></rect>
              </svg>
            </div>
          </div>
        </Dialog>
      </div>
      {/*  */}
    </>
  );
};
