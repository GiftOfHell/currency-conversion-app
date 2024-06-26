import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiInputDateModule } from '@taiga-ui/kit';

@Component({
  selector: 'date-selector',
  standalone: true,
  imports: [FormsModule, TuiInputDateModule],
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent {
  @Output() dateChange = new EventEmitter<Date>();
  selectedDate: TuiDay;
  maxDate: TuiDay;

  constructor() {
    const currentDate = new Date();
    this.maxDate = new TuiDay(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    this.selectedDate = this.maxDate;
  }

  onDateChange(newTuiDate: TuiDay): void {
    const newDate = new Date(newTuiDate.year, newTuiDate.month, newTuiDate.day);
    this.dateChange.emit(newDate);
  }
}
