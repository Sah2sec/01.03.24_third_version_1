#include <iostream>
// програма удосконалена
using std::cin;
using std::cout;
using std::endl;

int main() {
  int user_num = 0;
  int hours = 0;
  int hours_left = 0;

  cout << "how many seconds did you work:" << endl;
  cin >> user_num;
  hours = user_num / 3600;
  hours_left = 8 - hours;

  cout << "You worked: " << hours << " hours" << endl
       << "Its been " << hours_left << " hours left";

  cout << endl << "\nP.S. ";
  if (hours_left < 3) {
    cout << "A little more and home" << endl;
  } else if (hours_left > 6) {
    cout << "Dude, this job must be really interesting if you got this program "
            "up and running in less than 2 hours of work"
         << endl;
  } else {
    cout << "You're doing great" << endl;

  cout << "\n\nJоudging by the fact that you counted the time in seconds, it must be a very interesting job\n\n";
}

// Користувач вводить із клавіатури час у секундах, що минув від
// початку робочого дня. Порахувати скільки цілих годин йому
// залишилося сидіти на роботі, якщо робочий день — 8 годин.