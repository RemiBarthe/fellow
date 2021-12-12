import { getStatisticsDocument, setStatisticsDocument } from '../utils/firestore';
import moment from 'moment';

export default {
  methods: {
    async updateStatistics(userId, spaceId, tickets){
      const monthYearDate =  moment(new Date()).format("MMYY");
      const todayDate =  moment(new Date()).format("DD/MM/YY");

      const countTicketState = {
        todo: 0,
        inprogress: 0,
        bloqued: 0,
        done: 0
      };

      tickets.map(ticket => {
        countTicketState[ticket.state]++;
      });

      const statistics = await getStatisticsDocument(userId, spaceId, monthYearDate);
      
      if(!statistics){
        const newStatistics = {
          id: monthYearDate,
          labels: [todayDate],
          todo: [countTicketState.todo],
          inprogress: [countTicketState.inprogress],
          bloqued: [countTicketState.bloqued],
          done: [countTicketState.done]
        };

        setStatisticsDocument(userId, spaceId, newStatistics);
      } else{
        if(statistics.labels.at(-1) === todayDate){
          statistics.todo.pop();
          statistics.todo.push(countTicketState.todo);

          statistics.inprogress.pop();
          statistics.inprogress.push(countTicketState.inprogress);

          statistics.bloqued.pop();
          statistics.bloqued.push(countTicketState.bloqued);

          statistics.done.pop();
          statistics.done.push(countTicketState.done);
        }
        else{
          statistics.labels.push(todayDate);
          statistics.todo.push(countTicketState.todo);
          statistics.inprogress.push(countTicketState.inprogress);
          statistics.bloqued.push(countTicketState.bloqued);
          statistics.done.push(countTicketState.done);
        }

        setStatisticsDocument(userId, spaceId, statistics);
      }
    }
  }
};