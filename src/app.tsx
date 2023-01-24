import {
  DatePickerStateProvider,
  useContextCalendars,
  useContextDays,
  useContextMonthsPropGetters,
} from "@rehookify/datepicker";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button, Calendar } from "./components";

function Root() {
  const { calendars } = useContextCalendars();
  const { formattedDates } = useContextDays();
  const { previousMonthButton, nextMonthButton } =
    useContextMonthsPropGetters();

  const [start, end] = formattedDates;
  console.log(calendars, "calendars");
  return (
    <div className="block p-4 border border-slate-300 rounded shadow-xs shadow shadow-slate-300">
      <h1 className="text-2xl w-full text-center mb-6">
        {start ? start : "..."}&nbsp; - &nbsp;{end ? end : "..."}
      </h1>
      <main className="flex w-[500px] justify-between items-center">
        <Calendar
          prevButton={
            <Button className="w-8" {...previousMonthButton()}>
              <IoChevronBack />
            </Button>
          }
          nextButton={
            <Button className="w-8" {...nextMonthButton()}>
              <IoChevronForward />
            </Button>
          }
          calendar={calendars[1]}
        />
        <Calendar
          prevButton={
            <Button className="w-8" {...previousMonthButton()}>
              <IoChevronBack />
            </Button>
          }
          nextButton={
            <Button className="w-8" {...nextMonthButton()}>
              <IoChevronForward />
            </Button>
          }
          calendar={calendars[0]}
        />
      </main>
    </div>
  );
}

export const App = () => {
  const now = new Date();
  const M = now.getMonth();
  const Y = now.getFullYear();
  const D = now.getDate();
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: {
          mode: "range",
        },
        calendar: {
          offsets: [-1, 1],
        },
      }}
    >
      <Root />
    </DatePickerStateProvider>
  );
};
