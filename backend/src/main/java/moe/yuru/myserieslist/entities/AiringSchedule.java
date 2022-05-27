package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;

@Entity
public class AiringSchedule implements Serializable {
    
    private Date scheduleDate;

    public Date getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(Date scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

}
