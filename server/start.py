import coverage
import os

# coverage object
cov = coverage.Coverage(data_file=".coverage.{0}".format(os.getpid()),
                        source=["server/"], omit=["start.py", "stop.py"])
cov.start()

from server import main

if __name__ == '__main__':
    main(cov)