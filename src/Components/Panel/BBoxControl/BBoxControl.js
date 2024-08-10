import { __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { useEffect, useState } from 'react';

export const BBoxControl = ({ label, values, onChange = () => { }, resetValues, defaultValues, units, sides, style, className,disableUnits=false }) => {
  const [link, setLink] = useState(true);
  const [value, setValue] = useState(values || {});

  const unitSides = sides || ["top", "right", "bottom", "left"];

  const resetOption = resetValues && Object.keys(resetValues).map((key) => {
    let isReset = false;
    if (resetValues[key] !== value[key]) {
      isReset = false;
    } else {
      isReset = true;
    }
    return isReset
  })
  const isReset = resetValues && resetOption.includes(false) && Object.keys(value).length>0;
  const defaultUnits = [
    { label: "px", value: "px" },
    { label: "%", value: "%" },
    { label: "em", value: "em" },
    { label: "rem", value: "rem" },
    { label: "vw", value: "vw" },
    { label: "vh", value: "vh" },
  ];

  const handleChange = (val, dimension) => {
    if (!link) {
      setValue({ top: val, right: val, bottom: val, left: val });
    } else {
      if (sides) {
        dimension === "horizontal" ? setValue({ ...value, right: val, left: val }) : dimension === "vertical" && setValue({ ...value, top: val, bottom: val })
      } else {
        setValue({ ...value, [dimension]: val });
      }
    }
  };

  useEffect(() => {
    onChange(value);
  }, [value])

  return (
    <div style={{ marginBottom: "8px", ...style }} className={className}>
      <style>
        {`


        .bplUnitControlWrapper .components-base-control.components-input-control.components-number-control{
          margin-bottom:0px !important;
        }
        .bplUnitControlWrapper .components-base-control.components-input-control.components-number-control .components-base-control__field .components-input-base .components-input-control__container .components-input-control__input{
          font-size: 13px !important;
          padding-right: 0px !important;
        }
        .bplUnitControlWrapper .components-base-control.components-input-control.components-number-control .components-base-control__field .components-input-base .components-input-control__container .components-input-control__suffix .components-unit-control__select{
          padding:0px 0px;
        }
        .bplUnitControlWrapper .components-base-control.components-input-control.components-number-control .components-base-control__field .components-input-base .components-input-control__container .components-input-control__suffix{
          width:17px !important;
        }
        .bplPanel-link-button{
          background: transparent;
          border: none;
          padding: 0;
          margin-top: -13px;
          cursor: pointer;
          .dashicons{
            font-size:16px;
          }
        }
        .bplPanel-link-button .dashicons.dashicons-image-rotate{
          color:#666;
        }
        .bplPanel-link-button .dashicons.dashicons-image-rotate:hover{
            color:black;
          }
        `}
      </style>
      <div>
        <div style={{ marginBottom: "5px" }}>
          {label && <label>{label}</label>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: sides ? sides.includes("horizontal", "vertical") ? "5px" : "0px" : "0px" }}>
          {
            unitSides.map((val, i) => {
              return <div className="bplUnitControlWrapper" key={i}>
                <UnitControl
                  onChange={v => handleChange(v, val)} // Pass dimension
                  value={sides ? val === "horizontal" ? value.right : val === "vertical" && value.top : value[val]}
                  defaultValue={defaultValues || null}
                  units={units || defaultUnits}
                  disableUnits={disableUnits}
                />
                <div style={{ textAlign: "center", marginTop: "-4px" }}>
                  <small style={{ textTransform: "capitalize" }}>{val}</small>
                </div>
              </div>
            })
          }
          {
            !sides && <button className="bplPanel-link-button" onClick={() => setLink(!link)}>
              {
                link ? <span className="dashicons dashicons-admin-links"></span> : <span className="dashicons dashicons-editor-unlink"></span>
              }
            </button>
          }
          {
            isReset && <button onClick={()=>setValue(resetValues)} className="bplPanel-link-button">
              <span className="dashicons dashicons-image-rotate"></span>
            </button>
          }
        </div>
      </div>
    </div>
  );
};